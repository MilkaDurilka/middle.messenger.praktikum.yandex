import type { TState } from "../types";
import type { TBlockConstructor } from "../../block";
import { store } from "../store";
import { StoreEvents } from "../constants";
import { deepClone } from "../../object";

export function withStore<T extends Record<string, unknown>>(
  mapStateToProps: (state: TState) => T
) {
  return function wrap<P>(Component: TBlockConstructor<P & T>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof T>) {
        let prevStateProps = deepClone(mapStateToProps(store.getState()));
        super({ ...props, ...prevStateProps });

        store.on(StoreEvents.Updated, () => {
          const stateProps = deepClone(mapStateToProps(store.getState()));
          // @ts-ignore
          this.setProps({ ...stateProps });
          prevStateProps = stateProps;
        });
      }
    };
  };
}
