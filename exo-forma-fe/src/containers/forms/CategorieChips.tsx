import React, { useEffect, useState } from "react";
import { FormProps } from "../../types/models";
import { Box, Chip, FormHelperText, IconButton, TextField } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { lowerCase } from "lodash";

interface ChipData {
  key: number;
  label: string;
}

const CategorieChips = ({ currentProject, setField }: FormProps) => {
  const categories: string[] = currentProject.categories;
  const [categoriesView, setCategoryView] = useState<ChipData[]>([]);
  const [data, setData] = useState<string>("");
  const [error] = useState<boolean>(false);

  useEffect(() => {
    if (categories.length > 0) {
      let x = categories.map((c: string, index) => ({ key: index, label: c } as ChipData));
      setCategoryView(x);
    }
  }, [categories]);

  const handleAdd = () => {
    let data_ = lowerCase(data);
    let newChipView = { key: categoriesView.length, label: data_ } as ChipData;
    let isPresent = categories.find(c => data_ === lowerCase(c));
    if (!isPresent && data !== "") {
      setCategoryView(oldArray => [...oldArray, newChipView]);
      let x = [...categories, data_];
      setField("categories", x);
    }
  };

  const handleDelete = (chipToDelete: ChipData) => () => {
    setCategoryView(chips => chips.filter(chip => chip.key !== chipToDelete.key));
    setField("categories", categories.filter(chip => chip !== chipToDelete.label));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        flexDirection: "column",
        p: 0.5
      }}

    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div><TextField error={error} id="outlined-basic" label="Categorie" value={data} onChange={e => setData(e.target.value)}
                        variant="outlined" />
          {error && <FormHelperText>Errore</FormHelperText>}
        </div>
        <div>
          <IconButton color={"primary"} aria-label="add" size={"large"} onClick={handleAdd}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </div>
      </Box>
      <Box sx={{ display: "flex", mt: 2 }}>
        {categoriesView.map((data: ChipData) => {
          return (
            <Chip sx={{ mr: 1 }} key={`chip-${data.key}`} color={"primary"} icon={<TagIcon />} label={data.label} onDelete={handleDelete(data)} />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorieChips;
