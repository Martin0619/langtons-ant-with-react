import { useCallback, useEffect, useRef, useState } from 'react'
import cls from './styles.module.scss'

enum Direction {
	Up,
	Right,
	Down,
	Left,
}

export default function LangtonAnt() {
	const ref = useRef<HTMLCanvasElement>(null)
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [direction, setDirection] = useState<Direction>(Direction.Up)
	const [context2D, setContext2D] = useState<CanvasRenderingContext2D | null>()
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!typeof window || !ref) return
		const canvas = ref.current
		if (!canvas) return
		setX(canvas.width / 2)
		setY(canvas.height / 2)
		const context2D = canvas.getContext('2d')
		setContext2D(context2D)
		if (!context2D) return
		context2D.fillStyle = 'rgba(0, 0, 0, 1)'
	}, [])

	const run = useCallback(() => {
		if (!context2D) return
		setCount((c) => c + 1)
		const color = context2D.getImageData(x, y, 1, 1)
		const red = color?.data[0]
		if (red > 100) {
			context2D.fillStyle = 'rgba(0, 0, 0, 1)'
			context2D.fillRect(x, y, 1, 1)
			turnLeft()
		} else {
			context2D.fillStyle = 'rgba(255, 255, 255, 1)'
			context2D.fillRect(x, y, 1, 1)
			turnRight()
		}
		new Promise<void>((resolve) =>
			setTimeout(() => {
				resolve(run())
			}, 1000)
		)
	}, [x, y])

	useEffect(() => {
		;(async () => await run())()
	}, [run])

	function moveForward(direction: Direction) {
		switch (direction) {
			case Direction.Up: {
				setY((prev) => prev - 1)
				break
			}

			case Direction.Right: {
				setX((prev) => prev + 1)
				break
			}

			case Direction.Down: {
				setY((prev) => prev + 1)
				break
			}

			case Direction.Left: {
				setX((prev) => prev - 1)
				break
			}

			default:
				break
		}
	}

	function turnLeft() {
		setDirection((dir) => {
			dir -= 1
			if (dir < Direction.Up) dir = Direction.Left
			moveForward(dir)
			return dir
		})
	}

	function turnRight() {
		setDirection((dir) => {
			dir += 1
			if (dir > Direction.Left) dir = Direction.Up
			moveForward(dir)
			return dir
		})
	}

	return <canvas ref={ref} className={cls['canvas-container']} />
}
