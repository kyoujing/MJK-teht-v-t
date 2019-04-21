import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader,
    IconButton,
} from '@material-ui/core';
import {OpenWith} from '@material-ui/icons';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ImageGrid = (props) => {
    return (
        <GridList>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                <ListSubheader component="div">Files</ListSubheader>
            </GridListTile>
            {props.picArray.map(tile => (
                <GridListTile key={tile.file_id}>
                    {(tile.thumbnails !== undefined
                        &&
                        <img src={mediaUrl + tile.thumbnails.w160} alt={tile.title}/>)
                    ||
                    (tile.screenshot !== undefined
                        &&
                        <img src={mediaUrl + tile.screenshot} alt={tile.title}/>)
                    ||
                    <img src="http://placekitten.com/400/400" alt={tile.title}/>
                    }
                    <GridListTileBar
                        title={tile.title}
                        actionIcon={
                            <React.Fragment>
                                <IconButton component={Link}
                                            to={'single/' + tile.file_id}>
                                    <OpenWith color="secondary"/>
                                </IconButton>
                                {props.edit &&
                                <React.Fragment>
                                    <IconButton component={Link}
                                                to={'modify/' + tile.file_id}>
                                        <span style={{color: '#fff'}}>Modify</span>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        props.deleteFile(tile.file_id);
                                    }}>
                                        <span style={{color: '#fff'}}>Delete</span>
                                    </IconButton>
                                </React.Fragment>
                                }
                            </React.Fragment>
                        }
                    />
                </GridListTile>
            ))}
        </GridList>
    );
};

ImageGrid.propTypes = {
    picArray: PropTypes.array.isRequired,
    edit: PropTypes.bool,
    deleteFile: PropTypes.func,
};

export default ImageGrid;