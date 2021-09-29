import { useRouter } from 'next/dist/client/router'
import { useEffect, useState, useContext } from 'react'
import 'tailwindcss/tailwind.css'
import { CountUp } from 'use-count-up'

import { AccountContext } from '../utils/accounts'

//
let currSlide = 0;
export default function FactsCarousel({ facts }) {
  const { config, setConfig } = useContext(AccountContext);

  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [interval, setInterval] = useState(0);

  const navigateCarousel = (decrease) => {
    
    console.log(currSlide);

    if (decrease) {
      currSlide--;
      if (currSlide < 0) currSlide = facts?.length - 1;
    }
    else {
      currSlide++;
      console.log(currSlide);

      if (currSlide >= facts?.length) currSlide = 0;
    }
    setCurrentSlide(currSlide);
    document.getElementById("slide" + currSlide)?.scrollIntoView();
  }

  useEffect(e => {
    if (!facts) return;
    window.clearInterval(interval);
    console.log("updating carosel?")
    if (config?.account?.account) return; // stop

    setInterval(window.setInterval(e => {
      console.log("updating carosel?")
      navigateCarousel();
    }, 12000));
  }, [config?.account?.account]);

  return (
    <div className="lg:grid lg:grid-col-2 flex flex-col w-full gap-2 lg:px-2 pt-0">
      <div className="w-full carousel">
        {facts?.map((fact, id) => {
          return (<div key={id} id={"slide" + id} className="relative w-full flex flex-col text-center  carousel-item">
            <div className="md:text-xl text-lg font-thin">{fact.header}</div>
            <div className="md:text-lg text-lg md:pb-0">{fact.description}</div>

            <div className={fact.total ? "" : "hidden"}>
              <div className="stats text-center">
                <div className="stat bg-opacity-0 pr-0">
                  <div className="stat-value text-dark md:text-3xl text-2xl">
                    {currentSlide === id && <CountUp isCounting end={fact.total} duration={3.2} thousandsSeparator="," autoResetKey={currentSlide} />}
                  </div>
                  <div className="stat-desc text-dark">{fact.footer}</div>
                </div>
              </div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 lg:left-2 lg:right-2 left-0 right-0 top-1/2">
              <a onClick={navigateCarousel} className="btn btn-circle border-0 bg-opacity-0">❮</a>
              <a onClick={e => navigateCarousel(true)} className="btn btn-circle border-0 bg-opacity-0">❯</a>
            </div>
          </div>);
        })}

      </div>
    </div>
  )
}


