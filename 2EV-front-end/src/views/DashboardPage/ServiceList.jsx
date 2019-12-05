import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  List
} from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";

import FolderIcon from "@material-ui/icons/Event";
import DeleteIcon from "@material-ui/icons/Delete";
const API_BASE = "http://localhost:8080";

const ServiceList = ({ setHasEvents }) => {
  const [events, setEvents] = useState([]);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchEvents = async () => {
      const url = `${API_BASE}/booking`;
      const result = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      const { appointments } = await result.json();
      const newEvents = appointments.map(
        ({ title, end, start, number, name, _id }) => ({
          title,
          end,
          start,
          number,
          name,
          _id
        })
      );
      setEvents(newEvents);
      setHasEvents(newEvents.length > 0);
    };
    fetchEvents();
  }, []);

  const deleteEvent = async _id => {
    const url = `${API_BASE}/booking/delete`;
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ _id }),
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });

    const updatedEvents = events.filter(event => event._id !== _id);
    setEvents(updatedEvents);
    setHasEvents(updatedEvents.length > 0);
  };

  const getListItems = () => {
    return events.map((event, index) => (
      <ListItem key={index}>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={event.title}
          secondary={moment(event.start).format("LLL")}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteEvent(event._id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  };

  return <List dense={false}>{getListItems()}</List>;
};

export default ServiceList;
