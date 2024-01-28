import './News.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getNewsData() {
    setLoading(true);
    try {
      const resp = await axios.get("https://newsapi.org/v2/everything?q=tech&apiKey=b738ed2669c54125aae96fba7c1107d5&pageSize=10");
      setNewsData(resp.data.articles);
    } catch (error) {
      setError("Failed to fetch news data. Please try again later.");
    }
    setLoading(false);
  }

  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <div className="News">
      <header className="News-header">
        {loading ? "Loading..." : error ? <div>{error}</div> : (
          <Container>
            {newsData.map((newsItem, index) => (
              <Row className="d-flex justify-content-center" key={index}>
                <Col xs={12} className="mt-5 w-500">
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    <Card>
                      <Card.Title className="my-3">{newsItem.title}</Card.Title>
                      <Card.Img src={newsItem.urlToImage} />
                      <Card.Body>
                        <Card.Text>
                          {newsItem.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              </Row>
            ))}
          </Container>
        )}
      </header>
    </div>
  );
}

export default News;
