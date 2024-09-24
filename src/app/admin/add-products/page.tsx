import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import React from 'react'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import NullData from '@/components/NullData'

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="You dont have access to this page"/> 
  }

  return (
    <div>
      <Container>
        <FormWrap>
          <AddProductForm/>
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts