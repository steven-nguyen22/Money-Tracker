import Nav from "./Nav";

function Register() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div>
        <form>
          <h1>Register</h1>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
