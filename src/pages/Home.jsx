import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { getMovies } from '../api/tmdb';

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function Home() {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const list = await getMovies();
        if (!ignore) setPicks(shuffle(list));
      } catch (err) {
        if (!ignore) setPicks([]);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <section className="py-14 md:py-20">
        <p className="text-sm font-medium text-emerald-600">สัปดาห์นี้: Fetch / JSON / API</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          หนังน่าดู รวมไว้ที่เดียว
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          MovieHub ใช้ข้อมูลจริงจาก TMDB แล้วเก็บ cache รายวันเพื่อให้โหลดเร็วและไม่ยิง API ซ้ำ
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/movies" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
            ดูหนังทั้งหมด
          </Link>
          <Link to="/lab" className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50">
            ทดลองยิง API
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">หนังแนะนำ</h2>
            <p className="text-sm text-slate-500">สุ่มลำดับใหม่ทุกครั้งที่เปิดหน้า แหล่งข้อมูล: TMDB</p>
          </div>
          <button onClick={() => setPicks(shuffle(picks))} className="text-sm text-emerald-600 hover:underline">
            สุ่มใหม่
          </button>
        </div>
        <FeaturedCarousel movies={picks} />
      </section>
    </div>
  );
}

export default Home;
