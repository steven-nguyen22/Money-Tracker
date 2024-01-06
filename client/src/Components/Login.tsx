import Nav from "./Nav";

function Login() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="object-center">
        <form>
          <h1>Login</h1>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
