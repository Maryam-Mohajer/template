'use client'
import ChooseTableModal from '@/components/Menu/ChooseTableModal/ChooseTableModal';
import Menu from '@/components/Menu/Menu'
import { useAuthenticationContext } from '@/core/context/AuthenticationContext';
import { UserRole } from '@/core/enums/user-role.enum';
import React, { useEffect, useState } from 'react'

const MenuWithOutCart = () => {

  const [canWaiterOrder, setCanWaiterOrder] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<any>(false)

  const { roles }: any = useAuthenticationContext();

  useEffect(() => {
    if (roles && roles.length > 0) {
      setCanWaiterOrder(roles.some((p: any) => roles.includes(UserRole.Waiter)));
    }
  }, [roles])

  return (
    <>
      {openModal &&
        <ChooseTableModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          title="شماره میز را انتخاب نمایید"
        />
      }
      <Menu
        canWaiterOrder={canWaiterOrder}
        setOpenModal={setOpenModal}
      />
    </>
  )
}

export default MenuWithOutCart