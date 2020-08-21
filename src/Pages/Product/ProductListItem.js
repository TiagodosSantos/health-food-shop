import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      background: '#fff',
      borderRadius: '8px',
      marginTop: '8px',
      padding: '16px',
      position: 'relative',
      boxShadow: '0 4px 8px grey',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    small: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
      },
  }));

const ProductListItem = ({ product, onRemovePressed, onCompletedPressed, handleRemove, handleUpdate }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const matches = useMediaQuery('(max-width:480px)');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const remove = (product) => {
        handleRemove(product);
        handleClose();
    };

    const update = (product) => {
        handleUpdate(product);
        handleClose();
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} sm container>
                        <Grid item container xs={3} direction="row" >
                            <ButtonBase className={classes.image}>
                                {matches ? <Avatar key={product.id} alt={product.description} src={`/assets/images/${product.filename}`} className={classes.small}/>
                                    :
                                    <Avatar key={product.id}  alt={product.description} src={`/assets/images/${product.filename}`} className={classes.large}/>
                                }
                            </ButtonBase>
                            <Typography variant="body2"  style={{paddingTop: "16px", fontSize: '0.8rem'}}>
                                Created at:&nbsp;
                                    {product.createdAt}
                            </Typography>
                        </Grid>

                        <Grid item container xs={9} direction="row">
                            <Grid item container xs={12}>
                                <Grid item xs={10}>
                                    <Typography gutterBottom variant="h6">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {product.type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} style={{paddingLeft: "16px"}}>
                                    <IconButton color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e)} aria-label="more" size="medium">
                                        <MoreHorizIcon />
                                    </IconButton>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}>
                                        <MenuItem onClick={() => update(product)} style={{marginRight: "16px"}}>
                                        <IconButton color="primary" aria-label="update">
                                            <UpdateIcon />
                                        </IconButton> 
                                            Update
                                        </MenuItem>
                                        <MenuItem onClick={() => remove(product)}>
                                            <IconButton color="secondary" aria-label="remove" >
                                                <DeleteIcon />
                                            </IconButton> 
                                            Remove
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12}>
                                <Grid item xs={3} >
                                    <Rating name="disabled" value={product.rating} disabled />
                                </Grid>
                                <Grid item xs={7} />
                                <Grid item xs={2} >
                                    <Typography variant="subtitle1">${product.price}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default (ProductListItem);