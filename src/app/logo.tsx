import localFont from 'next/font/local'
import SvgIcon from '@mui/material/SvgIcon';
import {  Stack } from '@mui/material';
// Font files can be located inside `app`
const myFont = localFont({
    src: '/fonts/SF-Pro-Rounded-Bold.ttf',
    display: 'swap',
})

const Logo = ()=>{
    return (
        <Stack spacing={1} direction="row" 
        alignItems="center">
            <SvgIcon sx={{fontSize: "30px"}}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z" fill="#FF0000" />
                    <path d="M10.0166 22.2256C8.82715 22.2256 8.09912 21.5488 8.09912 20.4312C8.09912 20.1133 8.20166 19.6519 8.36572 19.2007L12.0161 9.17236C12.5596 7.66504 13.4722 6.97803 14.9385 6.97803C16.4868 6.97803 17.3892 7.63428 17.9531 9.17236L21.6343 19.2007C21.8086 19.6826 21.8804 20.0312 21.8804 20.4209C21.8804 21.4771 21.0908 22.2256 19.9937 22.2256C18.9067 22.2256 18.3428 21.7334 18.0146 20.5234L17.5122 18.8828H12.4468L11.9443 20.4619C11.5854 21.7129 11.0215 22.2256 10.0166 22.2256ZM13.1953 16.0425H16.6919L14.959 10.3413H14.877L13.1953 16.0425Z" fill="white" />
                </svg>
            </SvgIcon>
            <div className={myFont.className} style={{textAlign: "center",fontSize: "21px", "fontWeight": "700",
                textDecoration: "none",
                userSelect: "none",}}>
                Careers
            </div>
 
      </Stack> 
    )
}

export default Logo;