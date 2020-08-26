/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const PaperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} style={{ borderTop: '3px solid #318EDA' }} />
        </Draggable>
    );
};

const CustomDialog = (props) => {
    const {
        open,
        handleClose,
        labelButton,
        action,
        message,
        dialogTitle,
        data = [],
        campos = [],
        editData = false,
    } = props;

    const [state, setState] = React.useState({
        // name: null,
        // value: null,
    });

    const [disableButton, setDisableButton] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        let disable = false;
        campos.forEach(campo => {
            if(!campo.opcional && (campo.dado in state) && !state[campo.dado] && !disable){
                disable = true;
            }
        });
        setDisableButton(disable);
    }, [state]);

    const onCloseDialog = () => {
        setState({
            /* name: null, value: null */
        });
        handleClose();
    };

    return (
        <form>
            <Dialog
                open={open}
                onClose={onCloseDialog}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title">
                    
                <DialogTitle
                    style={{ cursor: 'move' }}
                    id="draggable-dialog-title">
                    {dialogTitle || 'Todos os Dados'}
                </DialogTitle>
                <DialogContent>
                    {message ||
                        campos.map((campo) =>
                            !editData ? (
                                <Typography key={campo.dado} variant="body2" gutterBottom>
                                    <strong>{campo.dado}: </strong>{data[campo.dado]}
                                </Typography>
                            ) : (
                                <TextField
                                    key={campo.dado}
                                    name={campo.dado}
                                    label={campo.titulo}
                                    defaultValue={data[campo.dado]}
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    InputProps={{
                                        readOnly: campo.dado == 'id' || campo.dado == 'createdAt',
                                    }}
                                />
                            )
                        )}
                </DialogContent>
                <DialogActions>
                    {!action ? null : (
                        <Button
                            autoFocus
                            color="primary"
                            onClick={() => {
                                let dataToUpdate = state;
                                dataToUpdate = {
                                    ...data, ...dataToUpdate
                                };
                                action(dataToUpdate);
                                onCloseDialog();
                            }}
                            disabled={disableButton}
                        >
                            {labelButton || 'None'}
                        </Button>
                    )}
                    <Button autoFocus color="primary" onClick={onCloseDialog}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
};

export default CustomDialog;
