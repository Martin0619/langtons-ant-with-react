export enum Direction {
	Up,
	Right,
	Down,
	Left,
}

export const LangtonsAntInitialState = {
	x: 0,
	y: 0,
	direction: Direction.Up,
}

type Actions =
	| {
			type: 'turn_left'
	  }
	| {
			type: 'turn_right'
	  }
	| {
			type: 'setup'
			payload: { x: number; y: number }
	  }

export default function langtonsAntReducer(
	state: typeof LangtonsAntInitialState,
	action: Actions
): typeof LangtonsAntInitialState {
	switch (action.type) {
		case 'turn_left': {
			state.direction--
			if (state.direction < Direction.Up) {
				state.direction = Direction.Left
			}
			moveForward(state)
			return { ...state }
		}

		case 'turn_right': {
			state.direction++
			if (state.direction > Direction.Left) {
				state.direction = Direction.Up
			}
			moveForward(state)
			return { ...state }
		}

		case 'setup': {
			return { ...state, ...action.payload }
		}

		default:
			return { ...state }
	}
}

function moveForward(obj: typeof LangtonsAntInitialState) {
	switch (obj.direction) {
		case Direction.Up: {
			obj.y--
			break
		}

		case Direction.Right: {
			obj.x++
			break
		}

		case Direction.Down: {
			obj.y++
			break
		}

		case Direction.Left: {
			obj.x--
			break
		}

		default:
			break
	}
}
