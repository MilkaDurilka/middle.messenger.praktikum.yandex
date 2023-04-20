import { withStore } from "../../shared/utils/store";
import type { TWithUser } from "./types";

export const withUser = withStore((state): TWithUser => ({ user: state.user }));
