import React, { useState } from 'react'
import Button from './Button'
import RegisterModal from './RegisterModal';

function NoList() {
    const [modal, setModal] = useState(false);

    const onClickEvent = () => {
        setModal(true);
    }

    return (
        <>
        <div className='nolist'>
            <h1>
                오늘은 등록된 목록이 없네요,<br/>
                해야 할 일을 확인해 볼까요?
            </h1>
            <Button text="등록" onClick={onClickEvent} />
        </div>
        {modal && <RegisterModal onClose={() => { setModal(false)}}/>}
        </>
    )
}

export default NoList