import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  // ADD YOUR TOKEN HERE
  const TOKEN =
    "PASTE_YOUR_TOKEN_HERE";

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      let url =
        "http://4.224.186.213/evaluation-service/notifications";

      if (type) {
        url += `?notification_type=${type}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [type]);

  const getChipColor = (notificationType) => {
    switch (notificationType) {
      case "Event":
        return "primary";
      case "Placement":
        return "success";
      case "Result":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,rgb(230, 239, 255),rgb(255, 255, 255))",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#1e3a8a",
              mb: 2,
            }}
          >
            Campus Notifications
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "gray",
              mb: 4,
            }}
          >
            Stay updated with Events, Results & Placements
          </Typography>

          {/* FILTER */}
          <FormControl
            sx={{
              minWidth: 250,
              background: "white",
              borderRadius: "12px",
            }}
          >
            <InputLabel>Filter Type</InputLabel>

            <Select
              value={type}
              label="Filter Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="">All Notifications</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* LOADING */}
        {loading ? (
          <Box textAlign="center" mt={10}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: "20px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      height: "100%",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: "#111827",
                          }}
                        >
                          {item.title || "Campus Update"}
                        </Typography>

                        <Chip
                          label={item.type || "Notification"}
                          color={getChipColor(item.type)}
                        />
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#4b5563",
                          lineHeight: 1.8,
                          mb: 2,
                        }}
                      >
                        {item.message ||
                          "New notification available for students."}
                      </Typography>

                      <Box
                        sx={{
                          mt: 2,
                          p: 1,
                          background: "#f3f4f6",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6b7280",
                            fontWeight: "bold",
                          }}
                        >
                          Notification ID:
                        </Typography>

                        <Typography variant="body2">
                          {item.id || index + 1}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mt: 10,
                }}
              >
                <Typography variant="h5" color="gray">
                  No notifications found
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default App;