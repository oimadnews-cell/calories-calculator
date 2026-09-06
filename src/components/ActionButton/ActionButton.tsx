import type { ButtonHTMLAttributes } from 'react'
import styles from './ActionButton.module.css'

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary'
}

function ActionButton({ variant, className, type = 'button', ...rest }: ActionButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary
  const classes = className ? `${styles.button} ${variantClass} ${className}` : `${styles.button} ${variantClass}`

  return <button type={type} className={classes} {...rest} />
}

export default ActionButton
