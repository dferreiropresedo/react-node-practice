import { Stack, styled } from "@mui/material";

const SCBoardColumns = styled(Stack)({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '16px',
    maxHeight: '100%',
    '&::-webkit-scrollbar': {
        display: 'none'
    }
});

export {SCBoardColumns}
