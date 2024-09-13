import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import home from '../../Images/home.jpg'
 import styled from 'styled-components';

function SHome() {
    

  return (
    <main className='main-container'>
        <div className='main-title'>
            
        </div>

        <div className='main-cards'>
            <div className="row">
                <div className="col-12">
                    <div className='card '>
                        <div className='card-inner'>
                            <h3 className='card-title'>About Us</h3>
                        </div>
                        <div className="card_student">
                        <img src={home} alt="product" className='card_img'/>
                        <p className='card_description'>A sustainable environmental initiative that promotes afforestation by encouraging
                                    students to plant and nurture a tree during their academic journey. The project aims
                                    to instill a sense of environmental responsibility among students, fostering a
                                    connection between education and ecological conservation. By linking each student
                                    with the growth of a tree, the initiative contributes to carbon sequestration
                                    biodiversity, and overall environmental well-being. It serves as a practical and
                                    tangible way for educational institutions to engage their students in fostering a
                                    greener and healthier planet. "One Student One Tree" embodies the idea that small
                                    individual actions collectively create a significant positive impact on the
                                    environment.
                        </p>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>CATEGORIES</h3>
                            <BsFillGrid3X3GapFill className='card_icon'/>
                        </div>
                        <h1>12</h1>
                    </div>
                </div>
            </div>
            

        </div>

        <div className='charts'>


        </div>
    </main>
    
  )
}

export default SHome