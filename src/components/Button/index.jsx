import  Loading  from '../Loading'

const Button = (props) => {
  const {
    type,
    className,
    disabled,
    value,
    loading,
    handleClick,
  } = props

  return (
    <button
      type={type}
      className={`btn ${className}`}
      disabled={disabled}
      onClick={!loading ? handleClick : () => {}}
    >
      {loading ? <Loading /> : value}
    </button>
  )
}

export default Button
