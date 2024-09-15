import React from 'react'

export default function imageBlur() {
  return (
   <>
     <img style={{
        filter: 'blur(10px)',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)',
        position:'relative',
        zIndex: '1',
        transition: 'all 0.5s ease-in-out',
        cursor: 'pointer',
   
     }} src="https://img.freepik.com/premium-vector/silhouette-man-drinking-water-drinking-water-benefits-illustration-isolated-white-background_529206-84.jpg?w=740" alt="" />
   
   
   </>
  )
}
