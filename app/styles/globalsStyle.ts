"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box;
    word-break: break-all;

  }

  html, body { 
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI;
    font-size : 16px;
  }
  
  button {
    outline: none;
    border:none;
    background: unset;
    cursor: pointer;
  }

  a{
    cursor: pointer;
    text-decoration: none;
    &:active,&:visited{
      color:unset;
    }
  }

  ul, ol {
    list-style: none;
  }
  `;
