import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import News from "../components/News";
import { getAllNews } from "../actions/newsfeedAtion";

export default function Newsfeedscreen() {





    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  


    const dispatch = useDispatch();

    const newsstate = useSelector((state) => state.getAllNewsReducer);

    const { news, error, loading } = newsstate;

    const [sortOrder, setSortOrder] = useState("desc");

    const sortedNews = news.sort((a, b) => {
        if (sortOrder === "desc") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNews, setFilteredNews] = useState(sortedNews);

    const searchNews = () => {
        const filtered = sortedNews.filter(
            (newsItem) =>
                newsItem.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
                newsItem.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNews(filtered);
    };
    // const searchNews = () => {
    //     const filtered = sortedNews.filter(
    //         (newsItem) =>
    //             newsItem.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             newsItem.description.toLowerCase().includes(searchQuery.toLowerCase())
    //     );
    //     setFilteredNews(filtered);
    //     setSearchQuery("");
    // };
    

    useEffect(() => {
        dispatch(getAllNews());
    }, []);

    useEffect(() => {
        setFilteredNews(sortedNews);
    }, [sortedNews]);

    const handleSort = () => {
        const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
        setSortOrder(newSortOrder);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          searchNews();
        }
      };


      const newsCount = news.length;



    return (
        <div>
            <br />
            <br />
            <br />
            <div class="jumbotron img-jmbo">
                <div class="container p-3">
                    <br />
                    <br />
                    <br />
                    <h10 style={{ fontSize: "45px", color: "white" }}>
                        News & Events <i class="fa fa-pepper-hot" aria-hidden="true"></i>
                        {/* <h1>Current Time: {time}</h1> */}
                    </h10>
                    <p style={{ fontSize: "12px", color: "white", fontFamily: "Mukta, calibri", fontStyle: "italic" }}>Discover the latest food delivery news and events</p>
                    <br />
                </div>
            </div>
            <div class="container p-5">
                <div class="row justify-content-center ">
                    <div class="col-md-6">
                        <div class="search">
                            <i class="fa fa-search"></i>
                            <input
                                type="text"
                                placeholder="Search news & events"
                                value={searchQuery}
                                className="form-control"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={() => searchNews()} class="btn">
                                Search
                            </button>
                           

                        </div>

                    </div>


                </div>
            </div>


            <div class="row">
                <div class="col-md-6"><h9>"{newsCount}" Posts</h9></div>
                <div class="col-md-6"> <h9 onClick={() => handleSort()}>
                    <i class="fa fa-sort" aria-hidden="true"></i> {sortOrder === "desc" ? "Oldest" : "Newest"}
                </h9></div>
            </div>


            <div className="row justify-content-center">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error="Something went wrong" />
                ) : filteredNews.length === 0 ? (
                    <p10>No results found for "{searchQuery}".</p10>
                ) : (
                    filteredNews.map((newsItem) => (
                        <div className="col-md-8 m-8" key={newsItem._id}>
                            <News news={newsItem} />
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
