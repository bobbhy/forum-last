import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Skill.css";
import Box from '@material-ui/core/Box';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

const Skill = (props) => {
  const dev = props.dev;
  const normal = props.normal;
  const software = props.software;
  const others=props.others;

  return (
    <section className="resume-section m-0" id="skills">
      <div className="resume-section-content">
        <h2 className="mb-5">Skills</h2>
        {
          dev.length!=0 && (<>
          <div className="subheading mb-3">Programming Languages</div>
        <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
          {dev?.map((e) => (
            <div className="col-sm-3 mr-4 d-block mb-2">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" className="d-flex align-items-center space-between flex-nowrap justify-content-start"><i className={e.icon + " fa-2x"} /><span className="ml-2">{e.name}</span></Typography>
                <Rating readOnly name="customized-10" defaultValue={e.value / 2} max={5} />
              </Box>
            </div>
          ))}
        </div>
          </>)
        }
        {
          software.length!=0 && (<>
          <div className="subheading mb-3 mt-3">Softwares and Other Skills</div>
        <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
          {software?.map((e) => (
            <div className="col-sm-3 mr-4 d-block">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" className="d-flex align-items-center space-between flex-nowrap justify-content-start"><i className={e.icon + " fa-2x"} /><span className="ml-2">{e.name}</span></Typography>
                <Rating readOnly name="customized-10" defaultValue={e.value / 2} max={5} />
              </Box>
            </div>
          ))}
        </div>
          </>)
        }
        {
          normal?.length !=0 &&
          (<>
          <div className="subheading mb-3 mt-3">Languages</div>
        <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
          {normal?.map((e) => (
            <div className="col-sm-5 mr-4 d-block">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">{e.name}</Typography>
                <Rating readOnly name="customized-10" defaultValue={e.value} max={6} />
              </Box>
            </div>
          ))}
        </div>
          </>)
        }
        {
          others?.map((other)=>other.otherItems.length!=0 &&
            (
              <>
                <div className="subheading mb-3 mt-3">{other.name}</div>
        <div className="d-flex flex-row" style={{ flexWrap: "wrap" }}>
          {other.otherItems?.map((otherItem)=>(
            <div className="col-5 mr-4 d-block">
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">{otherItem.name}</Typography>
                <Rating readOnly name="customized-10" defaultValue={otherItem.value} max={10} />
              </Box>
            </div>
          ))}
           </div>
              </>
            )
          )
        }
        
        
      </div>
    </section >
  );
};
export default Skill;
