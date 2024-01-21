# Документация по тестированию с использованием Jest, React Testing Library и TypeScript

В этой документации мы рассмотрим, как правильно настраивать и писать тесты для  проекта с использованием Jest, React Testing Library и TypeScript. Эти инструменты позволяют вам создавать надежные и типизированные тесты для проекта.

## Написание тестов с Jest и TypeScript
### Создание файла с тестами
Тесты мы пишем рядом возле файла с кодом, пример `index.test.tsx`

### Пример теста с нашего проекта
Давайте напишем простой тест для функции, которая складывает два числа с использованием TypeScript:

```
// shared/lib/classnames/index.ts
type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = []
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className)
  ].join(' ');
}
```
```
// shared/lib/classnames/index.test.ts
import { classNames } from './index';

describe('classnames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with additional class', () => {
    const expectedValue = 'someClass class1 class2';
    expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(
      expectedValue
    );
  });
  test('with first param, with mods and additional classes', () => {
    const expectedValue = 'someClass class1 class2 hovered focused';
    expect(
      classNames('someClass', { hovered: true, focused: true }, [
        'class1',
        'class2'
      ])
    ).toBe(expectedValue);
  });
  test('with mods false', () => {
    const expectedValue = 'someClass class1 class2 hovered';
    expect(
      classNames('someClass', { hovered: true, focused: false }, [
        'class1',
        'class2'
      ])
    ).toBe(expectedValue);
  });
  test('with mods undefined', () => {
    const expectedValue = 'someClass class1 class2 hovered';
    expect(
      classNames('someClass', { hovered: true, focused: false }, [
        'class1',
        'class2'
      ])
    ).toBe(expectedValue);
  });
});
```

### Запуск тестов
Вы можете запустить тесты с помощью команды:
```
npm run unit
```

## Тестирование компонентов с React Testing Library и TypeScript
### Пример компонента с TypeScript

Давайте представим, что у нас есть простой компонент с использованием TypeScript:
```
// shared/ui/button/index.tsx
import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from 'shared/lib/classnames';

import cls from './style.module.scss';

export type ThemeButton = 'primary' | 'clear' | 'outline';

interface ButtonOwnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

export const Button: FC<ButtonOwnProps> = ({
  className = '',
  children,
  theme = 'primary',
  ...otherProps
}) => (
  <button
    type='button'
    className={classNames(cls.Button, {}, [className, cls[theme]])}
    {...otherProps}
  >
    {children}
  </button>
);
```
```
// shared/ui/button/index.test.tsx
import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('button', () => {
  test('test render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });
  test('without theme prop', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).not.toHaveClass('clear');
  });
  test('test clear theme', () => {
    render(<Button theme='clear'>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
  test('test outline theme', () => {
    render(<Button theme='outline'>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('outline');
    screen.debug();
  });
});
```

### Запуск тестов
Вы можете запустить тесты с помощью команды:
```
npm run unit
```
