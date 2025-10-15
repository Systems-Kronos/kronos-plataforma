import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  disablePortal: true,
  disableScrollLock: true,
};

export default function MuiSingleSelect({
  value,
  onChange,
  options = [],
  loading = false,
  name,
  id,
}) {
  const selectId = id || name;

  const getLabelByValue = (val) => {
    const option = options.find((opt) => opt.value === val);
    return option ? option.label : "";
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            id={`${selectId}-input`}
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
                borderWidth: "2px",
                borderRadius: "8px",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#370963",
                borderWidth: "2px",
              },
              "&.MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            "& .MuiSelect-select": { 
                display: 'flex',
                alignItems: 'center',
                height: '30px',
              },
            }}
          />
        }
        disabled={loading}
        renderValue={(selected) => (
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getLabelByValue(selected)}
          </Typography>
        )}
        MenuProps={MenuProps}
      >
        {loading ? (
          <MenuItem value="" disabled>
            Carregando...
          </MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                "&:hover": {
                  backgroundColor: "#EADAF5",
                },
                "&.Mui-selected": {
                  backgroundColor: "#EADAF5",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#EADAF5",
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}
