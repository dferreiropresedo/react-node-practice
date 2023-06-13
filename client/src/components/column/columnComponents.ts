import { Stack, Typography, styled, Button } from "@mui/material";


const SCColumn = styled(Stack)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'rgb(230,230,230,1)',
    minWidth: '400px',
    width: '25%',
    height: '90%',
    borderRadius: '4px',
    margin: 'auto',
    paddingTop: '12px'
});

const SCColumnTaskContainer = styled(Stack)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'rgb(230,230,230,1)',
    borderRadius: '4px',
    paddingTop: '12px',
    paddingBottom: '8px',
    overflowX: 'auto',
});

const SCColumnTitle = styled(Typography)({
    color: 'rgb(0,0,0,1)',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingRight: '12px',
    fontWeight: 'bold'
});

const SCAddTaskButton = styled(Button)({
    color: 'rgb(0,0,0,0.5)',
    width: '90%',
    textTransform: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontWeight: '600',
    marginTop: 'auto'
})

export { SCColumnTaskContainer, SCColumn, SCColumnTitle, SCAddTaskButton }