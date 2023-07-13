'use client'
import headers from '@/config/headers';
import style from '@/styles/Filter.module.css';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters({ onSubmit, sort }) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [labelFilters, setLabelFilters] = useState([]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };

  const handleLabelFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLabelFilters((prevLabelFilters) => [...prevLabelFilters, value]);
    } else {
      setLabelFilters((prevLabelFilters) =>
        prevLabelFilters.filter((label) => label !== value)
      );
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const filterData = {
      sort_order: sortOrder,
      sort_type: sortType,
      categories: categories,
      label_filters: labelFilters,
    };

    if (labelFilters.includes('on_going')) {
      filterData.label_filters.push('bid');
    }

    if (labelFilters.includes('upcoming')) {
      filterData.label_filters.push('upcoming');
    }

    onSubmit(filterData);
  };

  useEffect(() => {
    if (sort === 'bid') {
      setSortType('bid_price');
    } else {
      setSortType('price');
    }
  }, [sort]);

  const pathname = usePathname()

  return (
    <>
      <form onSubmit={handleFilterSubmit}>
        <h6 className={style.h6_title}>Sort</h6>
        <div className={style.time_title}>
          <div className={style.price_title}>
            <h6>price</h6>
            <div className={`${style.form_check} d-flex justify-content-between`}>
              <label className="form-check-label" htmlFor="price1">
                Terendah ke Tertinggi
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="price"
                id="price1"
                value="asc"
                onChange={handleSortOrderChange}
                checked={sortOrder === 'asc'}
              />
            </div>
            <div className={`${style.form_check} d-flex justify-content-between`}>
              <label className="form-check-label" htmlFor="price2">
                Tertinggi ke Terendah
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="price"
                id="price2"
                value="desc"
                onChange={handleSortOrderChange}
                checked={sortOrder === 'desc'}
              />
            </div>
          </div>

          <h6>time</h6>
          <div className={`${style.form_check} d-flex justify-content-between`}>
            <label className="form-check-label" htmlFor="time1">
              Terbaru
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="time"
              id="time1"
              value="created_at"
              onChange={handleSortTypeChange}
              checked={sortType === 'created_at'}
            />
          </div>
          <div className={`${style.form_check} d-flex justify-content-between`}>
            <label className="form-check-label" htmlFor="time2">
              Terlama
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="time"
              id="time2"
              value="oldest"
              onChange={handleSortTypeChange}
              checked={sortType === 'oldest'}
            />
          </div>
        </div>

        <h6 className={style.h6_title}>Filter</h6>
        {pathname === '/auction' ? (
            <div className={style.auction_title}>
                <h6>auction</h6>
                <div className={`${style.form_check} d-flex justify-content-between`}>
                    <label className="form-check-label" htmlFor="ongoing1">
                    On Going
                    </label>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    value="on_going"
                    id="ongoing1"
                    onChange={handleLabelFilterChange}
                    checked={labelFilters.includes('on_going')}
                    />
                </div>
                <div className={`${style.form_check} d-flex justify-content-between`}>
                    <label className="form-check-label" htmlFor="upcoming1">
                    Upcoming
                    </label>
                    <input
                    className="form-check-input"
                    type="checkbox"
                    value="upcoming"
                    id="upcoming1"
                    onChange={handleLabelFilterChange}
                    checked={labelFilters.includes('upcoming')}
                    />
                </div>
            </div>
        ) : null}

        <div className={style.category_title}>
          <h6>category</h6>
          <div className={`${style.form_check} d-flex justify-content-between`}>
            <label className="form-check-label" htmlFor="abstrak">
              Abstrak
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              value="abstrak"
              id="abstrak"
              onChange={handleCategoryChange}
              checked={categories.includes('abstrak')}
            />
          </div>
          <div className={`${style.form_check} d-flex justify-content-between`}>
            <label className="form-check-label" htmlFor="dua_dimensi">
              Dua Dimensi
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              value="dua_dimensi"
              id="dua_dimensi"
              onChange={handleCategoryChange}
              checked={categories.includes('dua_dimensi')}
            />
          </div>
        </div>

        <button className="btn btn-danger w-100" type="submit">
          Filter
        </button>
      </form>
    </>
  );
}
