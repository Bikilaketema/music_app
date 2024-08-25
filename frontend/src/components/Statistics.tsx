/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    Container,
    ChartWrapper,
    Header,
    Section,
    SectionTitle,
    Table,
    TableHeader,
    TableCell
} from '../styles/Statistics.style';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Statistics: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/api/songs/stats`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching statistics data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) return <Section><SectionTitle>Loading...</SectionTitle></Section>;

    const {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        songsPerGenre,
        songsAndAlbumsPerArtist,
        songsPerAlbum,
    } = data;

    const genreLabels = songsPerGenre.map((item: any) => item._id);
    const genreCounts = songsPerGenre.map((item: any) => item.count);

    const artistLabels = songsAndAlbumsPerArtist.map((item: any) => item._id);
    const artistSongCounts = songsAndAlbumsPerArtist.map((item: any) => item.songsCount);
    const artistAlbumCounts = songsAndAlbumsPerArtist.map((item: any) => item.albumsCount);

    const albumLabels = songsPerAlbum.map((item: any) => item._id);
    const albumCounts = songsPerAlbum.map((item: any) => item.count);

    return (
        <Container>
            <Header>Statistics</Header>

            <Section>
                <SectionTitle>Total Statistics</SectionTitle>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Count</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <TableCell>Total Songs</TableCell>
                            <TableCell>{totalSongs}</TableCell>
                        </tr>
                        <tr>
                            <TableCell>Total Artists</TableCell>
                            <TableCell>{totalArtists}</TableCell>
                        </tr>
                        <tr>
                            <TableCell>Total Albums</TableCell>
                            <TableCell>{totalAlbums}</TableCell>
                        </tr>
                        <tr>
                            <TableCell>Total Genres</TableCell>
                            <TableCell>{totalGenres}</TableCell>
                        </tr>
                    </tbody>
                </Table>
                <ChartWrapper>
                    <Bar
                        data={{
                            labels: ['Songs', 'Artists', 'Albums', 'Genres'],
                            datasets: [{
                                label: 'Total Count',
                                data: [totalSongs, totalArtists, totalAlbums, totalGenres],
                                backgroundColor: '#007bff',
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allow chart to resize
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { callbacks: { label: (tooltipItem) => `Count: ${tooltipItem.raw}` } },
                            },
                        }}
                    />
                </ChartWrapper>
            </Section>

            <Section>
                <SectionTitle>Songs Per Genre</SectionTitle>
                <ChartWrapper>
                    <Bar
                        data={{
                            labels: genreLabels,
                            datasets: [{
                                label: 'Number of Songs',
                                data: genreCounts,
                                backgroundColor: '#007bff',
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allow chart to resize
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { callbacks: { label: (tooltipItem) => `Count: ${tooltipItem.raw}` } },
                            },
                        }}
                    />
                </ChartWrapper>
            </Section>

            <Section>
                <SectionTitle>Songs and Albums Per Artist</SectionTitle>
                <ChartWrapper>
                    <Bar
                        data={{
                            labels: artistLabels,
                            datasets: [
                                {
                                    label: 'Number of Songs',
                                    data: artistSongCounts,
                                    backgroundColor: '#007bff',
                                    stack: 'Stack 0',
                                },
                                {
                                    label: 'Number of Albums',
                                    data: artistAlbumCounts,
                                    backgroundColor: '#ff6384',
                                    stack: 'Stack 1',
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allow chart to resize
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}` } },
                            },
                        }}
                    />
                </ChartWrapper>
            </Section>

            <Section>
                <SectionTitle>Songs Per Album</SectionTitle>
                <ChartWrapper>
                    <Bar
                        data={{
                            labels: albumLabels,
                            datasets: [{
                                label: 'Number of Songs',
                                data: albumCounts,
                                backgroundColor: '#007bff',
                            }],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allow chart to resize
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: { callbacks: { label: (tooltipItem) => `Count: ${tooltipItem.raw}` } },
                            },
                        }}
                    />
                </ChartWrapper>
            </Section>
        </Container>
    );
};

export default Statistics;
