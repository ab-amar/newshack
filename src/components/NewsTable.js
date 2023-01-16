import React, { useState, useEffect } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  LinearProgress,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { NewsState } from "../NewsContext";

const NewsTable = () => {
    var currentTime = new Date();
  var seconds =Math.floor(currentTime.getTime()/1000) ;
  var year = currentTime.getFullYear();

  function dateDiff(y) {
    return year - y;
  }
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const {search, setSearch} = NewsState();
  const [category,setCategory] = useState("story");
  const [popularity,setPopularity] = useState("search");
  const [time,setTime]=useState(0);
  

  const fetchNews = async () => {
    setLoading(true);
    var currentTime = new Date();
   seconds =Math.floor(currentTime.getTime()/1000) ;
    const { data } = await axios.get(`http://hn.algolia.com/api/v1/${popularity}?tags=${category}&numericFilters=created_at_i>${time===0?0:seconds-time}`);
    console.log(seconds-time);
    setNews(data.hits);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search,category,popularity,time]);

  function handleSearch() {
  
    console.log(news.length);
    var arr = news.filter((item) => {
        if(!item.title) return 0;
      return item.title.toLocaleLowerCase().includes(search);
    });
    return arr;
  }

  // const handlePaginationChange = (event, value) => {
  //   console.log(value);
  //   setCount(value - 1);
  //   setPage(value);
  // };

  return (
    <div>
        <div>
      Search
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small"></InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={category}
          label="Filter by"
          onChange={(e)=>{
            setCategory(e.target.value)
          }}

        >
          <MenuItem value={"story"}>Stories</MenuItem>
          <MenuItem value={"comment"}>Comments</MenuItem>
          <MenuItem value={"front_page"}>front_page</MenuItem>
          <MenuItem value={"poll"}>poll</MenuItem>
        </Select>
      </FormControl>
      by
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small"></InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={popularity}
          label="Filter by"
          onChange={(e)=>{
            setPopularity(e.target.value)
          }}
        >
          <MenuItem value={"search"}>Popularity</MenuItem>
          <MenuItem value={"search_by_date"}>Date</MenuItem>
        </Select>
      </FormControl>
      for
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small"></InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={time}
          label="Filter by"
          onChange={(e)=>{
            setTime(e.target.value)
          }}
        >
          <MenuItem value={0}>All Time</MenuItem>
          <MenuItem value={86400}>Past 24h</MenuItem>
          <MenuItem value={604800}>Past Week</MenuItem>
          <MenuItem value={2628000}>Past Month</MenuItem>
          <MenuItem value={31540000}>Past Year</MenuItem>
          
        </Select>
      </FormControl>
    </div>
      <TableContainer style={{ backgroundColor: "#F6F6EF" }}>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableBody>
              {handleSearch().map((row) => {
                return (
                  <TableRow>
                    <TableCell>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: "bold" }}>
                          {" "}
                          {row.title}{" "}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: "#828282",
                            textDecoration: "none",
                          }}
                        >
                          {" "}
                          {row.url ? (
                            <a href="/">{"(" + row.url + ")"}</a>
                          ) : null}{" "}
                        </span>
                      </div>
                      <div style={{ color: "#696969", fontSize: 10.66 }}>
                        {row.points} points | {row.author} |{" "}
                        {dateDiff(row.created_at.slice(0, 4))} years ago |{" "}
                        {row.num_comments} comments
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/* <Pagination
        count={parseInt((searchedNews.length + 9) / 10)}
        page={page}
        onChange={handlePaginationChange}
      /> */}
    </div>
  );
};

export default NewsTable;
