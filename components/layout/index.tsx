import type { ReactNode } from 'react'
import cls from './styles.module.scss'

export interface LayoutProps {
	children?: ReactNode
}

export default function Layout(props: LayoutProps) {
	return <main className={cls['layout-container']}>{props.children}</main>
}
