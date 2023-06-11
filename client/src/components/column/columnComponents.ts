import { Stack, styled } from "@mui/material";

const SCColumnContainer = styled(Stack)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgb(230,230,230,1)',
    width: '25%',
    height: '90%',
    borderRadius: '4px',
    margin: 'auto',
    paddingTop: '12px'
});

export { SCColumnContainer }