import styled from "styled-components";


export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width:100%;
height: 100%;
border: 1px solid lightblue;
border-radius:20px;

button{
    border-radius:0 0 20px 2px;
}
img{
    max-height:250px;
    object-fit:cover;
    border-radius:20px 20px 0 0;
}
`
 
;