import React, { useState, useEffect } from "react";
import { Player } from "../modules/players/player.interface";

// UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

// STYLE
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "auto",
    },
    paper: {
      width: 400,
      height: 600,
      overflow: "auto",
      maxHeight: 1000,
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  })
);

//  TYPES
type SelectedItem = {
  index: number;
  player: Player;
  selected: boolean;
  isFavorite: boolean;
};

export default function TransferList() {
  const classes = useStyles();

  // STATES
  const [players, setNewPlayers] = useState<SelectedItem[]>([]);
  const [favorites, setNewFavorites] = useState<SelectedItem[]>([]);

  // URLS
  const url = "http://www.balldontlie.io/api/v1/players";

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
  }, [players]);

  const getPlayers = async () => {
    const res = await fetch(url);
    const data = await res.json();
    initialSelectedArray(data.data);
  };

  /**
   * Constructor to Selected Array
   */
  const initialSelectedArray = (players: Player[]) => {
    let array: SelectedItem[] = [];
    for (let index = 0; index < players.length; index++) {
      array.push({
        index: index,
        player: players[index],
        selected: false,
        isFavorite: false,
      });
    }
    setNewPlayers([...array.filter((player) => player.isFavorite === false)]);
    setNewFavorites([...array.filter((player) => player.isFavorite === true)]);
  };

  /**
   * Change the selected items
   * @param {number} value The index of selected item in items array
   */
  const handleCheckBox = (playerID: number, type: string) => () => {
    let index: number = -1;
    let checked: boolean = false;

    if (type === "player") {
      index = players.findIndex((player) => player.player.id === playerID);
      //change selected
      checked = players[index].selected;
      if (checked) {
        checked = false;
      } else {
        checked = true;
      }

      //change object
      const newPlayer = {
        ...players[index],
        selected: checked,
      };
      const array: SelectedItem[] = [
        ...players.slice(0, index ),
        newPlayer,
        ...players.slice(index + 1, players.length),
      ];
      // update
      setNewPlayers([...array]);
    } else {
      index = favorites.findIndex((player) => player.player.id === playerID);
      //change selected
      checked = favorites[index].selected;
      if (checked) {
        checked = false;
      } else {
        checked = true;
      }

      //change object
      const newPlayer = {
        ...favorites[index],
        selected: checked,
      };
      const array: SelectedItem[] = [
        ...favorites.slice(0, index),
        newPlayer,
        ...favorites.slice(index + 1, favorites.length),
      ];
      // update
      setNewFavorites([...array]);
    }
  };

  /**
   * Convert all 'Players' to 'Favorites'
   */
  const handleAllFavorites = () => {
    setNewFavorites([...favorites, ...players]);
    setNewPlayers([]);
  };

  /**
   * Convert all 'Favorites' to 'Players'
   */
  const handleAllPlayers = () => {
    setNewPlayers([...players, ...favorites]);
    setNewFavorites([]);
  };

  /**
   * Insert to 'Favorites' from 'Players'
   */
  const PlayersToFavorites = () => {
    const selectedPlayers = players.filter(
      (player) => player.isFavorite === false && player.selected === true
    );
    const array = players.filter((player) => !selectedPlayers.includes(player));
    selectedPlayers.forEach(player => {
      player.isFavorite = true;
    });
    setNewPlayers([...array]);
    setNewFavorites([...favorites,...selectedPlayers]);
  };

  /**
   * Insert to 'Players' from 'Favorites'
   */
  const FavoritesToPlayers = () => {
    
    const selectedFavorites = favorites.filter(
      (player) => player.isFavorite === true && player.selected === true
    );
    selectedFavorites.forEach(player => {
      player.isFavorite = false;
    });
    const array = favorites.filter(
      (player) => !selectedFavorites.includes(player)
    );
    
    setNewFavorites([...array]);
    setNewPlayers([...players,...selectedFavorites]);
  };

  const playersNewList = (items: SelectedItem[], type: string) => (
    <Paper className={classes.paper}>
      {type === "player" && (
        <h4
          style={{
            marginLeft: "8%",
            color: "cadetblue",
            position: "fixed",
            marginTop: -25,
          }}
        >
          PLAYERS
        </h4>
      )}
      {type === "favorite" && (
        <h4
          style={{
            marginLeft: "8%",
            color: "darkmagenta",
            position: "fixed",
            marginTop: -25,
          }}
        >
          FAVORITES
        </h4>
      )}
      <List dense component="div" role="list">
        {items.map((value: SelectedItem, index: number) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.player.id}
              role="listitem"
              button
              onClick={handleCheckBox(value.player.id, type)}
            >
              <ListItemIcon>
                {type === "player" && (
                  <Checkbox
                    checked={players[index].selected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                )}
                {type === "favorite" && (
                  <Checkbox
                    checked={favorites[index].selected}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  index +
                  " . " +
                  value.player.first_name +
                  " " +
                  value.player.last_name
                }
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{playersNewList(players, "player")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllFavorites}
            disabled={players.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={PlayersToFavorites}
            disabled={players.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={FavoritesToPlayers}
            disabled={favorites.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllPlayers}
            disabled={favorites.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{playersNewList(favorites, "favorite")}</Grid>
    </Grid>
  );
}
