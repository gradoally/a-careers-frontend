import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Dictionary,
    Sender,
    SendMode,
} from '@ton/core';
import { OPCODES } from './Config';
import { sha256Hash } from './Helpers';

export type UserConfig = {
    index: number;
    master_address: Address;
    user_address: Address;
    revoked_at: number;
    content: Cell;
};

export type UserData = {
    init: boolean;
    index: number;
    masterAddress: Address;
    userAddress: Address;
    revokedAt: number;
    content: Dictionary<bigint, Cell>;
};

export type UserContentData = {
    isUser: boolean;
    isFreelancer: boolean;
    nickname: string;
    telegram: string;
    about: string;
    website: string;
    portfolio: string;
    resume: string;
    specialization: string;
    language: string;
};

export type ResponseData = {
    text: string;
    price: bigint;
    deadline: number;
};

export function buildUserContent(data: UserContentData): Cell {
    const content = Dictionary.empty<bigint, Cell>();
    content.set(sha256Hash('is_user'), beginCell().storeBit(data.isUser).endCell());
    content.set(sha256Hash('is_freelancer'), beginCell().storeBit(data.isFreelancer).endCell());
    content.set(sha256Hash('nickname'), beginCell().storeStringTail(data.nickname).endCell());
    content.set(sha256Hash('telegram'), beginCell().storeStringTail(data.telegram).endCell());
    content.set(sha256Hash('about'), beginCell().storeStringTail(data.about).endCell());
    content.set(sha256Hash('website'), beginCell().storeStringTail(data.website).endCell());
    content.set(sha256Hash('portfolio'), beginCell().storeStringTail(data.portfolio).endCell());
    content.set(sha256Hash('resume'), beginCell().storeStringTail(data.resume).endCell());
    content.set(sha256Hash('specialization'), beginCell().storeStringTail(data.specialization).endCell());
    content.set(sha256Hash('language'), beginCell().storeUint(sha256Hash(data.language), 256).endCell());

    return beginCell().storeDictDirect(content, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()).endCell();
}

export function buildResponseContent(data: ResponseData): Cell {
    const content = Dictionary.empty<bigint, Cell>();
    content.set(sha256Hash('text'), beginCell().storeStringTail(data.text).endCell());
    content.set(sha256Hash('price'), beginCell().storeCoins(data.price).endCell());
    content.set(sha256Hash('deadline'), beginCell().storeUint(data.deadline, 32).endCell());

    return beginCell().storeDictDirect(content, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()).endCell();
}

export function userConfigToCell(config: UserConfig): Cell {
    return beginCell()
        .storeUint(config.index, 64)
        .storeAddress(config.master_address)
        .storeAddress(config.user_address)
        .storeUint(config.revoked_at, 32)
        .storeRef(config.content)
        .endCell();
}

export class User implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createFromAddress(address: Address) {
        return new User(address);
    }

    static createFromConfig(config: UserConfig, code: Cell, workchain = 0) {
        const data = userConfigToCell(config);
        const init = { code, data };
        return new User(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendCreateOrder(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        queryID: number,
        content: Cell,
        price: bigint,
        deadline: number,
        timeForCheck: number,
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(OPCODES.CREATE_ORDER, 32)
                .storeUint(queryID, 64)
                .storeMaybeRef(content)
                .storeCoins(price)
                .storeUint(deadline, 32)
                .storeUint(timeForCheck, 32)
                .endCell(),
        });
    }

    async sendAddResponse(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        queryID: number,
        orderIndex: number,
        content: Cell,
    ) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(OPCODES.ADD_RESPONSE_USER, 32)
                .storeUint(queryID, 64)
                .storeUint(orderIndex, 64)
                .storeRef(content)
                .endCell(),
        });
    }

    async sendChangeContent(provider: ContractProvider, via: Sender, value: bigint, queryID: number, newContent: Cell) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(OPCODES.CHANGE_CONTENT_USER, 32)
                .storeUint(queryID, 64)
                .storeRef(newContent)
                .endCell(),
        });
    }

    async getUserData(provider: ContractProvider): Promise<UserData> {
        const result = await provider.get('get_user_data', []);

        return {
            init: result.stack.readBoolean(),
            index: result.stack.readNumber(),
            masterAddress: result.stack.readAddress(),
            userAddress: result.stack.readAddress(),
            revokedAt: result.stack.readNumber(),
            content: result.stack
                .readCell()
                .beginParse()
                .loadDictDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()),
        };
    }
}
