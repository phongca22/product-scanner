import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption, ProgressBar, Searchbar, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { of, Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { setQuery } from '../stores/actions';
import ProductList from './product-list';

const Search: () => React$Node = (props) => {
  const [products, setProducts] = useState([]);
  const [searchSubject, setSearchSubject] = useState(null);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sub = new Subject();
    setSearchSubject(sub);
    const observable = sub
      .pipe(
        tap(() => setLoading(true)),
        debounceTime(350),
        switchMap((val) => {
          if (val) {
            const result = props.products.filter((p) => normalize(p.name).indexOf(normalize(val)) !== -1);
            return of(result);
          } else {
            return of([]);
          }
        })
      )
      .subscribe((data) => {
        setProducts(data);
        setLoading(false);
      });

    if (query) {
      sub.next(query);
    }

    if (props.query) {
      setQuery(props.query);
      sub.next(props.query);
    }

    return () => {
      observable.unsubscribe();
      sub.unsubscribe();
    };
  }, [props.products]);

  const normalize = (data) => {
    return data
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const onChangeSearch = (query) => {
    setQuery(query);
    props.setQuery(query);
    if (query) {
      searchSubject.next(query);
    } else {
      setProducts([]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Searchbar placeholder="Nhập tên sản phẩm" onChangeText={onChangeSearch} value={query} />
        {loading ? <ProgressBar indeterminate={true} color={props.theme.colors.accent} /> : <></>}
      </View>
      {query && products.length > 0 ? (
        <Caption style={{ marginLeft: 16, marginTop: 8 }}>{'Có ' + products.length + ' sản phẩm'}</Caption>
      ) : (
        <></>
      )}
      {query && products.length === 0 && !loading ? (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <Title>Không tìm thấy</Title>
        </View>
      ) : (
        <></>
      )}
      {products.length > 0 ? <ProductList data={products} query={query} /> : <></>}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    query: state.query
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setQuery: setQuery
    },
    dispatch
  );

const styles = StyleSheet.create({
  surface: {
    margin: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Search));
