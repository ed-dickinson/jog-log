import React from 'react'
import './AnimatedLogo.css';

const AnimatedLogo = () => {
  return (
    <div className="AnimatedLogo">
      <div className='runner-cont'>
        <div className='runner'>
          <div className='hip-joint joint'>
            <div className='thigh jog'>
              <span>
                <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                  <path d='M 2 0 L 2 2 A 1 1 0 0 1 0 2'></path>
                </svg>
              </span>
              <div className='knee-joint joint'>
                <div className='shin'>
                  <span>
                    <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                      <path d='M 0 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 0 1'></path>
                    </svg>
                  </span>
                  <div className='ankle-joint joint'>
                    <div className='foot'>
                      <span>
                        <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                          <path d='M 2 1 A 1 1 0 0 0 0 1 A 1 1 0 0 0 2 1 L 2 2 A 1 1 0 0 1 -1 2'></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='hip-joint joint'>
            <div className='thigh log'>
              <span>
                <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                  <path d='M 0 0 L 0 3 L 2 3'></path>
                </svg>
              </span>
              <div className='knee-joint joint log'>
                <div className='shin'>
                  <span>
                    <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                      <path d='M 0 1 A 1 1 0 0 1 2 1 A 1 1 0 0 1 0 1'></path>
                    </svg>
                  </span>
                  <div className='ankle-joint joint log'>
                    <div className='foot'>
                      <span>
                        <svg viewBox="0 0 1.5 1.5" xmlns="http://www.w3.org/2000/svg" >
                          <path d='M 2 1 A 1 1 0 0 0 0 1 A 1 1 0 0 0 2 1 L 2 2 A 1 1 0 0 1 -1 2'></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedLogo
