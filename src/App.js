import React, { useEffect, Component } from 'react';
import ContextState from './context_state_config';
import history from './utils/history';
import ReactGA from 'react-ga';
import './App.css'
import ttiPolyfill from 'tti-polyfill';


ReactGA.initialize('UA-144556525-1');


ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ReactGA.timing({
    category: "Load Performace",
    variable: 'Time to Interactive',
    value: tti
  })
});


const callback = list => {
    list.getEntries().forEach(entry => {
      console.log(entry)
        ReactGA.timing({
          category: "First Meaningful Paint",
          variable: entry.name,
          value: entry.responseEnd
        })
  })
}

var observer = new PerformanceObserver(callback);
observer.observe({entryTypes: [
                                  // 'navigation',
                                  // 'paint',
                                  // 'resource',
                                  // 'mark',
                                  // 'measure',
                                  // 'frame',
                                  // 'longtask'
                                ]})




 history.listen((location) => {
   if(location.pathname.includes('/user')) {
     let rootURL = location.pathname.split('/')[1]
     let userPage = location.pathname.split('/')[3]

     let pageHit = `/${rootURL}/${userPage}`
     ReactGA.pageview(pageHit)
   } else {
     ReactGA.set({ page: location.pathname });
     ReactGA.pageview(location.pathname)
   }
});

// history.listen((location) => {
//     ReactGA.set({ page: location.pathname });
//     ReactGA.pageview(location.pathname)
//   }
// );

const App = () => {

    return(
      <div className="App">
        React
        <ContextState />
      </div>
    )
}

export default App;
