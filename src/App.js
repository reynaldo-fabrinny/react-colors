import React, { Component } from 'react'
import Palette from "./Palette";
import { PALETTES } from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from "./Page";

class App extends Component {

  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = { palettes: savedPalettes || PALETTES }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  deletePalette(id) {
    this.setState(state => ({ palettes: state.palettes.filter(palette => palette.id !== id) }), this.syncLocalStorage);

  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage);
  }
  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    const PageNotFound = () => {
      return <div>Page Not Found!</div>
    }


    const Pallete = () => {
      let params = useParams();
      let id = params.id;
      let currentPallet = this.findPalette(id);
      if (currentPallet === undefined) {
        return <Navigate to="/" replace />;
      }

      return <Page><Palette {...generatePalette(currentPallet)} /></Page>;
    }

    const SingleColorPalettePage = () => {
      let params = useParams();
      let paletteId = params.paletteId;
      let colorId = params.colorId;
      let currentPallete = this.findPalette(paletteId);
      if (currentPallete === undefined) {
        return <Navigate to="/" replace />;
      }

      return <Page><SingleColorPalette colorId={colorId} {...generatePalette(currentPallete)} /></Page>;
    }

    return (
      <Routes>
        <Route key={0} exact path="/palette/new" element={<Page><NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} /></Page>} />
        <Route key={1} exact path="/" element={<Page><PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} /></Page>} />
        <Route key={2} exact path="/palette/:id" element={<Pallete />} />
        <Route key={3} exact path="/palette/:paletteId/:colorId" element={<SingleColorPalettePage />} />
        <Route key={4} path="*" element={<Page><PageNotFound /></Page>} />
      </Routes>
    )
  }
}

export default App;
