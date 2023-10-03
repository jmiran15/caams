export const ADD_EXPERIENCE = "ADD_EXPERIENCE";
export const REMOVE_EXPERIENCE = "REMOVE_EXPERIENCE";
export const UPDATE_EXPERIENCE = "UPDATE_EXPERIENCE";
export const SET_EXPERIENCES = "SET_EXPERIENCES";

// interface Experience {
//   id: string;
//   title: string;
//   employer: string;
//   location: string;
//   current: boolean;
//   from: Date;
//   to: Date;
//   summary: string;
//   user: string;
// }

// can generalize this reducer to education <Type>
export function experiencesReducer(state, action) {
  switch (action.type) {
    case ADD_EXPERIENCE: {
      return [...state, action.payload];
    }
    case REMOVE_EXPERIENCE: {
      return state.filter((experience) => experience.id !== action.payload.id);
    }
    case UPDATE_EXPERIENCE: {
      return state.map((experience) => {
        if (experience.id === action.payload.id) {
          return action.payload;
        }
        return experience;
      });
    }
    case SET_EXPERIENCES: {
      return action.payload;
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
