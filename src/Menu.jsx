import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function Menu(){
    return <div>
    <div
      style={{
        paddingTop: 100,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">
        <b>Welcome to Course Khazana!</b>
      </Typography>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
          minHeight: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Align items in the center
        }}
      >
        <Button
          style={{ marginBottom: 10 }} // Add margin to separate the buttons
          size="large"
          variant="contained"
          onClick={() => {
            window.location = "/addcourse";
          }}
        >
          Add Course
        </Button>

        <Button
          size="large"
          variant="contained"
          onClick={() => {
            window.location = "/courses";
          }}
        >
          View Courses
        </Button>
      </Card>
    </div>
  </div>
}

export default Menu;