import React from 'react';
import Firebase from './index'
 
const FirebaseContext: React.Context<Firebase | null> = React.createContext<Firebase | null>(null);

export const withFirebase = (Component: React.FC<any>) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
 
export default FirebaseContext;