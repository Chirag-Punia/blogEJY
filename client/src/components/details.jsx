import React from 'react'
import { useParams } from 'react-router-dom'
import Nav from './Nav';
import articleData from '../data/articleData';
export default function Details() {
  const {idd} = useParams();
  return (
    articleData.health.map((val) => (
        val.id === idd?<><Nav/><p>{val.description}</p></>:<></>
    ))
  )
}
