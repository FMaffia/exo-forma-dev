import { generateProjectItems } from "../../model/menuItems";
import { MenuObject } from "../../model/models";
import { capitalize } from "@mui/material";

export const findLabelByPath = (
  currentLocation: string
): string | undefined => {
  let menuFound: MenuObject | undefined = generateProjectItems().find(
    (a) => a.path === currentLocation
  );
  if (menuFound) {
    let segments: string[] | undefined = menuFound.path
      .split("/")
      .filter((x) => x);
    if (segments && segments.length > 1) {
      return capitalize(segments[segments.length - 1]);
    } else {
      return capitalize(segments[0]);
    }
  } else {
    return currentLocation;
  }
};
