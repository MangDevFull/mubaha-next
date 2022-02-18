import {  Row } from 'reactstrap';
export default function LoginSocail(){
  return(
    <>
       <Row style={{ paddingLeft: '29%'}}>
            <div className='socail'>
              <img src='/assets/icon/facebook.svg' width='40' height='40' alt="Mubaha" />
            
            </div>
        
            <div className='socail'>
              <img  src='/assets/icon/google.svg' width='40' height='40' alt="Mubaha" />
          
            </div>
       
        
            <div className='socail'>
              <img src='/assets/icon/zalo.svg' width='40' height='40' alt="Mubaha" />
            </div>
       
        </Row>
    </>
  )
}