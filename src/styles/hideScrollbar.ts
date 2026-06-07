import { css } from '@emotion/react';

/** Hides scrollbar while keeping scroll/touch functionality. */
export const hideScrollbar = css`
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;

  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    display: none !important;
    background: transparent !important;
  }
`;
