import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import BottomNavigation from '../components/common/BottomNavigation';
import ShowCalendar from '../components/ui/ShowCalendar';
import Page from '../styles/Page';
import ExpendList from '../components/calendar/ExpendList';
import TitleList from '../components/calendar/TitleList';
import Title from '../components/calendar/Title';
import Category from '../components/calendar/Category';
import Price from '../components/calendar/Price';
import Expenditure from '../components/calendar/Expenditure';
import Datelist from '../components/calendar/Datelist';
import Perdaytotal from '../components/calendar/Perdaytotal';
import Header from '../components/Layout/Header';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import Container from '../styles/Container';
import useFetch from '../hooks/useFetch';
import GetTotal from '../utils/GetTotal';
import axios from 'axios';

const Calendar = () => {
    // const caldata = useFetch(
    //     'get',
    //     'http://haeji.mawani.kro.kr:8585/api/expense/list'
    // );

    const [result, setResult] = useState([]);
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFetchData = async () => {
        await axios
            .get('http://haeji.mawani.kro.kr:8585/api/expense/list')
            .then((res) => {
                let response = res.data.expense;
                setResult(response.slice(0, 5));
                response = response.slice(5);
                setItem(response);
                setIsLoading(false);
            });
    };

    const _infiniteScroll = useCallback(() => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        let scrollTop = Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        );
        let clientHeight = document.documentElement.clientHeight;
        scrollHeight -= 1000;
        if (scrollTop + clientHeight >= scrollHeight && isLoading === false) {
            fetchMoreData();
        }
    }, [isLoading]);

    useEffect(() => getFetchData(), []);

    useEffect(() => {
        window.addEventListener('scroll', _infiniteScroll, true);
        return () => {
            window.removeEventListener('scroll', _infiniteScroll, true);
        };
    }, [_infiniteScroll]);

    const fetchMoreData = async () => {
        setIsLoading(true);
        setResult(result.concat(item.slice(0, 10)));
        setItem(item.slice(10));

        if (item.length > 15) {
            const timer = setTimeout(() => {
                setResult(result.concat(item.slice(0, 20)));
                setItem(item.slice(20));
                if (item.length === 25) clearTimeout(timer);
            }, 1000);
        }

        setIsLoading(false);
    };

    return (
        <Page>
            <Header title={'제목'} />
            <Container>
            <CalendarWrap>
                <ShowCalendar caldata={result} />
            </CalendarWrap>
            <Expenditure>
                <Datelist date={'1일'} weekday={'월요일'} />
                <Perdaytotal
                    counts={result.length}
                    amounts={GetTotal(result)}
                />
                <hr />
                {result.map(
                    ({ ehSeq, ehTitle, ehCcSeq, ehLocation, ehPrice }) => (
                        <ExpendList key={ehSeq}>
                            <TitleList>
                                <Title title={ehTitle} />
                                <Category
                                    culture={ehCcSeq}
                                    place={ehLocation}
                                    payment={ehCcSeq}
                                ></Category>
                            </TitleList>
                            <Price price={ehPrice} />
                        </ExpendList>
                    )
                )}
                {setIsLoading && <span>로딩중</span>}
            </Expenditure>
            </Container>
            <BottomNavigation />
        </Page>
    );

};

const CalendarWrap = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 380px;
    line-height: 1.25em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .react-calendar__navigation {
      width: 100%;
    }
    .react-calendar__viewContainer {
      .react-calendar__month-view {
        .react-calendar__month-view__days {
          height: 280px;
        }
      }
    }
  }
`;
export default Calendar;
