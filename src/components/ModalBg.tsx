import { Children } from "../types/global"

function ModalBg({ children }: Children) {
  return (
    <div className='modal'>{children}</div>
  )
}

export default ModalBg