import React from 'react';

export function LoginForm(props) {
  return (
    <div>
      <h2>Login Form</h2>
      <p>Login form not implemented in this simplified build.</p>
      <button onClick={props.onSuccess}>Mock Login</button>
    </div>
  );
}
