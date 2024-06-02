import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
const CustomToolbar = ({ onAdd, onDelete, onModify, showAddButton = true, showModifyButton = true, showDeleteButton = true }) => {
    return (
        <GridToolbarContainer sx={{ pb: 2 }}>
            {showAddButton && (
                <Button onClick={onAdd} color="secondary" >
                  <AddIcon style={{ marginRight: '8px' }}/>  add
                </Button>
            )}
            {showModifyButton && (
                <Button onClick={onModify} color="secondary">
                <UpdateIcon style={{ marginRight: '8px' }} /> Update
              </Button>
              
            )}
            {showDeleteButton && (
                <Button onClick={onDelete} color="secondary">
                    <HighlightOffIcon style={{ marginRight: '8px' }}/>Delete
                </Button>
            )}
          
            <div>
                <GridToolbarColumnsButton color="secondary" />
                <GridToolbarFilterButton color="secondary" />
                <GridToolbarExport color="secondary" />
            </div>
        </GridToolbarContainer>
    );
};

export default CustomToolbar;
