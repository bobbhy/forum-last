import React, { useState ,useEffect,initialState} from 'react'
import Modal from "react-bootstrap/Modal";
import styles from "./Other.module.css"
import ExtensionIcon from '@material-ui/icons/Extension';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import userService from '../../../../../../services/userService';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
function Other() {
    const [modalShow, setModalShow] = useState(true)
    const [next, setNext] = useState(false)
    const [title,setText]=useState("Add new skill block")
    const [name,setName]=useState("");
    const [value,setValue]=useState(0);
    const [data,setData]=useState(initialState);
    const [count,setCount]=useState(0);
    const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
];
 const skValue = (value) => {
    setValue(value);
  };
   const handleChange = (e) => {
    const value = e.target.value
    setName(value)
  }
const upload=()=>{
    userService.createOtherItem(title,name,value).then((response)=>{
        setName("");
        setValue(0);
        setCount(count+1);
    })
}
 useEffect(() => {
    const fetchData = async () => {
      const result = await userService.getAllOtherItems(title)
      setData(result.data);
    };
    if(title!="Add new skill block")
    {
        fetchData();
    }
    
  }, [title,count]);
const createOther=(name=null)=>{
    if(name==null)
    {
        setText("")
    }
    else
    {
        userService.createOther(name).then((response)=>{
        setNext(true);
        setText(name);
    })
    }
    
}
const deleteById = (id) => {
    userService.deleteOtherItem(id)
      .then((response) => {
        setCount(count+1);
      });
  };
    return (
        <div>
            <Modal
                show={modalShow}
                color="primary"
                onHide={() => setModalShow(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton={!next}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {next ? (<>
                        <div className="row pl-5">
                            <TextField required  value={name} className="col-5" label="Skill" onChange={handleChange}/>
                            <div className="col-4 mt-2 ml-5">
                            <Typography id="discrete-slider" gutterBottom>
                            Proficiency:
                            </Typography>
                            <Slider
                            defaultValue={value}
                            getAriaValueText={skValue}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks={marks}
                            min={1}
                            max={10}
                            />
                            </div>
                            <div className="col-2 mt-3">
                                <Button
                                onClick={upload}
                                variant="outlined"
                                color="primary"
                                size="medium"
                                disabled={name==""}
                                startIcon={
                                <AddCircleOutlinedIcon
                                style={{
                                maxWidth: "30px",
                                maxHeight: "30px",
                                minWidth: "30px",
                                minHeight: "30px",
                                }}/>
                        }>
                Add
              </Button>
                            </div>
                        </div>
                        <div className="responsive-table flex-fill">
                        <table class="table">
                        <thead>
                        <th>Skill</th>
                        <th>Proficiency</th>
                        <th>Delete</th>
                        </thead>
                        <tbody>
                            {data && data?.map((sk) => (
                    <tr className="mt-10">
                    <td>{sk.name}</td>
                    <td>{sk.value}</td>
                    <td>
                    <IconButton aria-label="delete" className="pt-0">
                    <DeleteIcon
                      style={{ color: "#df4759" }}
                      className="pt-0"
                      onClick={() => {
                        setTimeout(deleteById(sk.id), 500);
                      }}
                    />
                    </IconButton>
                    </td>
                    </tr>
            ))}
                        </tbody>
                        </table>
                        </div>
                    </>) : (<div className="row">
                        <div className="col-md-3" onClick={()=>createOther("Bureautique")}>
                            <div className={`${styles.card} ${styles.card_1}`}>
                                <h3>Bureautique</h3>
                                <p>A bunch of skills related to desktop</p>
                            </div>
                        </div>
                        <div className="col-md-3" onClick={() => createOther("Soft Skills")}>
                            <div className={`${styles.card} ${styles.card_3}`}>
                                <h3>Soft Skills</h3>
                                <p >A bunch of skills related to desktop</p>
                            </div>
                        </div>
                        <div className="col-md-3" onClick={() => createOther("Hard Skills")}>
                            <div className={`${styles.card} ${styles.card_4}`}>
                                <h3>Hard Skills</h3>
                                <p>A bunch of skills related to desktop</p>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className={`${styles.card} ${styles.card_2}`} onClick={()=>setNext()}>
                                <div className="row align-center">
                                    <ExtensionIcon />
                                    <h3>Custom</h3>
                                </div>
                                <p>Customize your skills block</p>
                            </div>
                        </div>
                    </div>)}

                </Modal.Body>
                {next && <Modal.Footer>
                        <Button variant="contained" style={{marginRight:'10px'}} color="primary" onClick={() => {setNext(false);setText("Add new skill block")}}>
                        Add Another Block
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setModalShow(false)}>
                        Close
                        </Button>
                    </Modal.Footer>}
            </Modal>

        </div >
    )
}

export default Other
